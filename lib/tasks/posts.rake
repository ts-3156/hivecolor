require 'csv'

namespace :posts do
  desc 'Import'
  task import: :environment do
    columns = %i(
      id
      title
      body
      created_at
      updated_at
    )

    text = File.open('posts.csv').read
    text.gsub!(/\R/, "\n")
    text.gsub!(/\\\n/, '')
    text.gsub!(/\\"/, '""')
    text.gsub!(%r{/(files|img|js)/id/}, '/cake_\1/id/')
    text.gsub!(%r{/files/syntaxhighlighter/}, '/cake_files/syntaxhighlighter/')
    # File.write('posts.converted.csv', text)

    records = []
    null_values = %w(\N [NULL])

    CSV.parse(text) do |line|
      attrs = columns.map.with_index {|name, i| [name, line[i].chomp]}.to_h.transform_values {|v| null_values.include?(v.to_s) ? nil : v.to_s}
      post = Post.new(attrs)

      if post.body.include? '<!-- content_cut -->'
        post.summary, post.body = post.body.split('<!-- content_cut -->')
      else
        puts "Invalid #{post.title}"
        post.summary = post.body
      end

      records << post
    end

    ApplicationRecord.transaction do
      ActiveRecord::Base.connection.execute('truncate posts restart identity;')
      Post.import! records, validate: false
      ActiveRecord::Base.connection.execute("SELECT setval('posts_id_seq', coalesce((SELECT MAX(id)+1 FROM posts), 1), false);")
    end
  end
end
