from flask import Flask, jsonify, render_template, request, Response

from deep_translator import GoogleTranslator

app = Flask(__name__)


@app.route('/wordtranslate', methods=['POST'])
def translate_word():
    # Ensure request contains JSON data
    data = request.get_json()
    if not data or 'word' not in data:
        return Response("Missing 'id' in request body", status=400)

    word = data.get('word')
    lang = "en"
    if 'lang' in data:
        lang = data.get('lang')

    print(f"Word: {word}, Lang: {lang}")
    translated = GoogleTranslator(source='auto', target=lang).translate(word)
    print(f"translated: {translated}")
    return jsonify(translated)


# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)


