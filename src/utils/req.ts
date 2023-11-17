/**
 * Asynchronously makes a request to the Backend.
 * @param {Object} options - Request options.
 * @param {string} options.uri - The API endpoint to access.
 * @param {string} [options.method='GET'] - The HTTP method for the request.
 * @returns {Promise} - A Promise containing the JSON response from the API.
 */
export default async function req({ uri, method = 'GET' }: { uri: string, method?: string }): Promise<any> {
  try {
    // Constructing the API URL
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL + uri}`;
    // Making the API request using fetch
    const response = await fetch(url, { method });

    // Returning the JSON content of the response
    return response.json();
  } catch (e) {
    console.log(e);
  }
}
