import requests

def get_service_status(service_url):
    try:
        result = requests.get(service_url)
        if result.status_code == 200:
            return 'up'
        else:
            return 'down'
    except requests.RequestException as error:
        print(f"An error occurred: {error}")
        return 'down'

if __name__ == "__main__":
    service_url = "http://localhost:8080"
    service_status = get_service_status(service_url)
    print(f"The service is {service_status}.")
