from bottle import *

@get('/js/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root='js')

@get('/css/<filename:re:.*\.css>')
def stylesheets(filename):
    return static_file(filename, root='css')

@get('/images/<filename:re:.*\.(jpg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root='images')

@route('/')
def index():
    return template('MemoryGame.html')

def main():
    run(host='localhost', port=8000)

if __name__ == '__main__':
    main()