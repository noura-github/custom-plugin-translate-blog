from flask import Flask, jsonify, render_template, request, Response

from dbdata import create_database, populate_employee_table, populate_files, link_employee_to_file
from handledbdata import find_image_file, get_employee_data

app = Flask(__name__)

# Route to fetch data
@app.route('/data', methods=['GET'])
def get_data():
    # Sample data to send to the frontend
    return jsonify(get_employee_data())

@app.route('/imagedata', methods=['POST'])
def get_image_data():
    # Ensure request contains JSON data
    data = request.get_json()

    if not data or 'id' not in data:
        return Response("Missing 'id' in request body", status=400)

    file_id = data.get('id')

    # Your logic to retrieve the file data
    file_row = find_image_file(file_id)
    if not file_row or not file_row[0]:
        return Response("File not found", status=404)

    blob_data = file_row[0]

    # Return binary data with appropriate headers
    response = Response(blob_data, mimetype='application/octet-stream')
    response.headers['Content-Disposition'] = 'attachment; filename="output_file.bin"'
    return response


# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


def init_db():
    create_database()
    populate_employee_table()
    populate_files()

    # Link employees to files
    link_employee_to_file(1, 1)
    link_employee_to_file(3, 2)
    link_employee_to_file(4, 3)
    link_employee_to_file(2, 4)

if __name__ == '__main__':
    # Initialize the database, populate it with data, and link employees to files
    # You can replace this with your own initialization logic
    #init_db()
    app.run(debug=True)


