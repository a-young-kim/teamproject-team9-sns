let list = [];

function searchF() {
  let input_user = document.getElementById("input_user").value;
  const url_search = window.location.origin + "/api/user_detail/search_user";
  let search_view = document.getElementById("div_users");

  const res = fetch(url_search, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      search_user: input_user,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      var output = ``;

      var i = 0;

      while (i < data.length) {
        output =
          output +
          ` <div class="card" style="margin-bottom: 5px">
              <div class="card-body" id="${data[i].username}" onclick="alert(this.id)">${data[i].username}
                
              </div>
            </div>
            `;

        i = i + 1;
      }

      search_view.innerHTML = output;
    });
}
