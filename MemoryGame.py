from bottle import *
from sys import argv

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
    run(host='0.0.0.0', port=argv[1])

if __name__ == '__main__':
    main()