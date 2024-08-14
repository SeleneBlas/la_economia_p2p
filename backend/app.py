from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

@app.route('/api/episodes')
def get_episodes():
    page = int(request.args.get('page', 1))
    page_size = int(request.args.get('size', 6))
    access_token = 'YOUR_SPOTIFY_ACCESS_TOKEN'  # Cambia esto por tu token de acceso

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    # URL para obtener episodios (ajusta la URL según tu necesidad)
    url = f'https://api.spotify.com/v1/shows/YOUR_SHOW_ID/episodes'
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        episodes = data.get('items', [])
        start = (page - 1) * page_size
        end = start + page_size
        paginated_episodes = episodes[start:end]
        return jsonify({'episodes': paginated_episodes})
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
