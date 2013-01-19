import web
from dropbox import client, rest, session
import time

app_key = '6tqpoonhurv29mz'
app_secret = 'gepizvnxzc0brtn'
access_type = 'app_folder'

urls = (
	'/', 'Index',
	'/allowed', 'Allowed'
)

sess = session.DropboxSession(app_key, app_secret, access_type)
request_token = sess.obtain_request_token()

class Index:
	def GET(self):
		print "using", app_key, app_secret, access_type
 		#sess = session.DropboxSession(app_key, app_secret, access_type)
		#request_token = sess.obtain_request_token()
	
		if not sess.is_linked():
			url = sess.build_authorize_url(request_token, 'http://simplyi.me:3000/allowed')
			raise web.seeother(url)
		else:
			return 'This is the index page'

class Allowed:
	def GET(self):
		access_token = sess.obtain_access_token(request_token)
		allowed_client = client.DropboxClient(sess)
		return "linked account:", allowed_client.account_info()		


if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
