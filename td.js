


///////////////////////////////////// td page functions //////////////////////////



    let tdArr = [];
    let teamLeaderEmail = ' ';
    let count = 0;
    let key = 0;

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

        let td = {
          id:`${key}`,
          reason: document.querySelector('.reason').options[document.querySelector('.reason').selectedIndex].value,
          start: document.querySelector('.start-time').value,
          finish: document.querySelector('.finish-time').value,

        };
        const node = document.createElement('p');
        node.setAttribute('id', td.id);
        const deductions = ` ${td.reason}: ${td.start} - ${td.finish}`;
        tdArr.push(deductions);
        node.innerText = deductions;
        key++
        //add eventlistener to the node
        //if clicked remove node and filter from array
        node.addEventListener('click', (e) => {
          e.target.parentNode.removeChild(e.target);
          let i = tdArr.map(item => item.id).indexOf(e.target.id);
          tdArr.splice(i, 1);

        });
        document.querySelector('.deductions').appendChild(node);
        document.querySelector('#focus').focus();

      });
      document.querySelector('.email').addEventListener('click', () => {


        const message = tdArr.join('  //  ');

        window.location.href = `mailto:${teamLeaderEmail}`
                                + "?subject=Time%20Deductions%20and%20Stats"
                                + "&body=" + message + `// Open slot total: ${count}`;
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
