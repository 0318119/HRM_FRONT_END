// api.js

export const fetchData = async (url) => {
    var get_refresh_token = localStorage.getItem("refresh");
    var get_access_token = localStorage.getItem("access_token");

    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            accessToken: `Bareer ${get_access_token}`,
          }
        });
        if (response.messsage == "unauthorized") {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${get_refresh_token}`,
              },
            });
            if (response.messsage == "timeout error") {
                window.location.href = "/"
            } 
            else{
                localStorage.setItem("refresh", response.referesh_token);
                localStorage.setItem("access_token", response.access_token);
                const data = await response.json();
                return data;
            }
        }else {
            const data = await response.json();
            return data;
        }
      } catch (error) {}
  };
  

  
  export const postData = async (url, body) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error posting data:', error);
      return error;
    }
  };
  