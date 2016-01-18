require 'digest/sha1'

module Jekyll

	module CacheBusterFilter

		def cache_buster( input )
			return "#{input}?cache-buster=#{Digest::SHA1.hexdigest( Time.now.to_s )}"
		end

	end

end

Liquid::Template.register_filter( Jekyll::CacheBusterFilter )
