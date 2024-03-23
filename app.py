from flask import Flask, render_template
# Flask uses port 5000
app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/music', methods=['GET'])
def music():
    return render_template('music.html')

if __name__ == 'main':
    app.run(debug=True, static_url_path='/static')
