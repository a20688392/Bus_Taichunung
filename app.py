from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/member', methods=['GET', 'POST'])
def member():
    if request.method == 'POST':
        print("user")
        print(request.form)
    return render_template('member.html')

if __name__ == '__main__':
    app.run()
