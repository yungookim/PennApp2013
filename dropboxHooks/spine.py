import web
from dropbox import client, rest, session
import time

app_key = '6tqpoonhurv29mz'
app_secret = 'gepizvnxzc0brtn'
access_type = 'app_folder'

urls = (
	'/', 'index'
)

sess = session.DropboxSession(app_key,app_secret, access_type)
request_token = sess.obtain_request_token()


class index:
	def GET(self):
		print "using", app_key, app_secret, access_type
		url = sess.build_authorize_url(request_token)
		raise web.seeother(url)
		



if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
