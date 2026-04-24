#!/usr/bin/env ruby

require 'fileutils'

in_dir  = File.join(__dir__, 'in')
out_dir = File.join(__dir__, 'out')

FileUtils.mkdir_p(in_dir)
FileUtils.mkdir_p(out_dir)

Dir.glob("#{in_dir}/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}").each do |src|
  rel = src.delete_prefix("#{in_dir}/")
  dst = File.join(out_dir, File.dirname(rel), "#{File.basename(rel, '.*')}.webp")
  FileUtils.mkdir_p(File.dirname(dst))
  system('ffmpeg', '-y', '-i', src, '-vf', 'scale=800:-1', dst)
end
