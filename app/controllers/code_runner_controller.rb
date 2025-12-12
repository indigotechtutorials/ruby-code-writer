require "open3"
require "pry"
require "fileutils"
require "securerandom"

class CodeRunnerController < Jetski::BaseController
  def create
    user_code = params["code"]
    file_name = "tmp/code_run_#{SecureRandom.hex(6)}.rb"
    File.open(file_name, "w") do |local_file|
      local_file.write(user_code)
    end
    stdout_s, stderr_s, status = Open3.capture3("ruby #{file_name}")
    if status.success?
      @results = stdout_s
    else
      @errors = [stderr_s]
    end

    render json: {
      results: @results,
      errors: @errors,
    }
    File.delete(file_name)
  end
end