from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/api/episodes', methods=['GET'])
def get_episodes():
    show_id = request.args.get('show_id')
    offset = request.args.get('offset', 0)
    limit = request.args.get('limit', 6)

    headers = {
        'Authorization': f'Bearer {CLIENT_SECRET}',
        'Content-Type': 'application/json'
    }
    response = requests.get(f'https://api.spotify.com/v1/shows/{show_id}/episodes?offset={offset}&limit={limit}', headers=headers)
    data = response.json()

    return jsonify(data['items'])

if __name__ == '__main__':
    app.run()
