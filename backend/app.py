from flask import Flask, jsonify, request
import requests
import os

app = Flask(__name__)

@app.route('/api/episodes', methods=['GET'])
def get_episodes():
    show_id = request.args.get('show_id')
    offset = request.args.get('offset', 0)
    limit = request.args.get('limit', 6)

    if not show_id:
        return jsonify({'error': 'show_id parameter is required'}), 400

    headers = {
        'Authorization': f'Bearer {os.getenv("CLIENT_SECRET")}',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.get(
            f'https://api.spotify.com/v1/shows/{show_id}/episodes?offset={offset}&limit={limit}',
            headers=headers
        )
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(data['items'])

if __name__ == '__main__':
    app.run(debug=True)  # Enable debug mode for development
