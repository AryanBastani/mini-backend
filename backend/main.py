# - Import Configurations
from Configs import *

# ------------------------ #
# - Flask Configuration -- #
# ------------------------ #
app = Flask(
    __name__,
    static_folder = FILES_DIRECTORY
)
CORS(app)



# - Endpoint to Handle Delivery Module
@app.route('/api/<course_id>/delivery/', methods = ['GET', 'POST'])
def delivery(course_id):
    if request.method == 'GET':
        # - Get Related Args
        lesson_id = request.args.get("lesson_id")
        user_id = request.args.get("user_id")
        print("Received GET request for course_id: {}, lesson_id: {}, user_id: {}".format(course_id, lesson_id, user_id))
        # - Load Json File
        conversation_data = {}
        json_file_path = os.path.join(FILES_DIRECTORY, 'conversation.json')
        if not os.path.exists(json_file_path):
            return jsonify({"error": "Conversation file not found"}), 404
        with open(json_file_path, 'r') as file:
            conversation_data = file.read()
        return jsonify({
            "course_id": course_id,
            "data": conversation_data
        }), 200
    elif request.method == 'POST':
        data = request.json
        print("Received POST request for course_id: {}, data: {}".format(course_id, data))
        return jsonify({"message": "POST request received for course delivery {}".format(course_id), "data": data}), 201
    else:
        return jsonify({
            "error": "Method not allowed"
        }), 405

# - Endpoint to Handle Lesson
@app.route('/api/<course_id>/lesson/', methods=['GET'])
def lesson(course_id):
    if request.method == 'GET':
        lesson_id = request.args.get("lesson_id")
        user_id = request.args.get("user_id")
        print("Received GET request for course_id: {}, lesson_id: {}, user_id: {}".format(course_id, lesson_id, user_id))
        # - Load Json File
        lesson_data = {}
        json_file_path = os.path.join(FILES_DIRECTORY, 'lesson.json')
        if not os.path.exists(json_file_path):
            return jsonify({"error": "Lesson file not found"}), 404
        with open(json_file_path, 'r') as file:
            lesson_data = file.read()
        return jsonify({
            "course_id": course_id,
            "data": lesson_data
        }), 200
    else:
        return jsonify({
            "error": "Method not allowed"
        }), 405

# - Endpoint to Handle Course
@app.route('/api/<course_id>/', methods=['GET'])
def course(course_id):
    if request.method == 'GET':
        user_id = request.args.get("user_id")
        print("Received GET request for course_id: {}, user_id: {}".format(course_id, user_id))
        # - Load Json File
        course_data = {}
        json_file_path = os.path.join(FILES_DIRECTORY, 'course.json')
        if not os.path.exists(json_file_path):
            return jsonify({"error": "Course file not found"}), 404
        with open(json_file_path, 'r') as file:
            course_data = file.read()
        return jsonify({
            "course_id": course_id,
            "data": course_data
        }), 200
    else:
        return jsonify({
            "error": "Method not allowed"
        }), 405

# - Endpoit to Update Profile
@app.route('/api/profile/', methods=['PUT'])
def update_profile():
    if request.method == 'PUT':
        data = request.json
        print("Received PUT request to update profile with data: {}".format(data))
        # Here you would typically update the user profile in your database
        return jsonify({"message": "Profile updated successfully", "data": data}), 200
    else:
        return jsonify({
            "error": "Method not allowed"
        }), 405