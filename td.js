


///////////////////////////////////// td page functions //////////////////////////



    const tdArr = [];
    let teamLeaderEmail = ' ';
    let count = 0;

    /////////////// save email to localStorage ////////////////////

    var email = localStorage.getItem('email');

    if(email) {
      teamLeaderEmail = email;
      document.querySelector('.tlEmail').value = email;
    //  document.querySelector('.email-box').style.visibility = 'collapse';
    }
      document.querySelector('.save').addEventListener('click', () => {
        teamLeaderEmail = document.querySelector('.tlEmail').value;
        localStorage.setItem('email', teamLeaderEmail);
      });

      document.querySelector('.add').addEventListener('click', () => {

        const td = {
          reason: document.querySelector('.reason').options[document.querySelector('.reason').selectedIndex].value,
          start: document.querySelector('.start-time').value,
          finish: document.querySelector('.finish-time').value,
          total: ''

        };
        const node = document.createElement('p');
        const deductions = `${td.reason}: ${td.start} - ${td.finish}`;
        tdArr.push(deductions);
        node.innerText = deductions;
        document.querySelector('.deductions').appendChild(node);
        document.querySelector('#focus').focus();


      });
      document.querySelector('.email').addEventListener('click', () => {


        const message = tdArr.join('  //  ');

        window.location.href = `mailto:${teamLeaderEmail}`
                                + "?subject=Time%20Deductions%20and%20Stats"
                                + "&body=" + message + `Open slot total: ${count}`;
      });


      // open counter functions


      document.querySelector('.plus').addEventListener('click', () => {
        count++
        document.querySelector('.number').innerText = count;
      });
      document.querySelector('.minus').addEventListener('click', () => {
        count--;
        document.querySelector('.number').innerText = count;
      });
