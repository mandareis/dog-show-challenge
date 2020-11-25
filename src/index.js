(function () {
  const url = "http://localhost:3000/dogs";
  const tableBody = document.querySelector("#table-body");
  const form = document.querySelector("#dog-form");

  document.addEventListener("DOMContentLoaded", () => {
    getDogs();
  });

  async function getDogs() {
    const response = await fetch(url);
    const dogData = await response.json();
    renderDogs(dogData);
  }

  function renderDogs(dogs) {
    tableBody.innerHTML = "";
    tableBody.append(
      ...dogs.map(function (d) {
        const tableRow = document.createElement("tr");
        const thName = document.createElement("th");
        thName.innerText = d.name;
        const thBreed = document.createElement("th");
        thBreed.innerText = d.breed;
        const thSex = document.createElement("th");
        thSex.innerText = d.sex;
        const thButton = document.createElement("th");
        thButton.innerHTML = "<button>Edit</button>";
        thButton.addEventListener("click", () => populateDogs(d));
        tableRow.append(thName, thBreed, thSex, thButton);
        return tableRow;
        //   tableRow.append(
        //     ...[d.name, d.breed, d.sex, ""].map((value) => {
        //       const th = document.createElement("th");
        //       th.innerText = value;
        //       return th;
        //     })
        //   );
      })
    );
  }
  function populateDogs(dog) {
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
    form.dataset.id = dog.id;
  }

  form.addEventListener("submit", onSubmit);

  function onSubmit(e) {
    const id = e.target.dataset.id;
    e.preventDefault();
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value,
      }),
    })
      .then((res) => res.json())
      .then(getDogs);
  }
})();
