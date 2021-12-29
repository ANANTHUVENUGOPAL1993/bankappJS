// var accounts = [
//     {
//       acno: 1000, ac_type: "savings", balance: 5000, transactions: [
//         { to: 1001, amount: 500, note: "ebill", method: "g-pay" },
//         { to: 1002, amount: 600, note: "geto", method: "neft" },
//         { to: 1003, amount: 100, note: "erchrge", method: "phone-pay" }
//       ]
//     },
//     {
//       acno: 1001, ac_type: "savings", balance: 6000, transactions: [
//         { to: 1000, amount: 1000, note: "emi", method: "phone-pay" },
//         { to: 1002, amount: 500, note: "geto", method: "neft" },
//         { to: 1003, amount: 100, note: "erchrge", method: "phone-pay" }

//       ]
//     },
//     {
//       acno: 1002, ac_type: "current", balance: 8000, transactions: [
//         { to: 1000, amount: 1000, note: "emi", method: "phone-pay" },
//         { to: 1001, amount: 5000, note: "geto", method: "neft" },
//         { to: 1003, amount: 100, note: "erchrge", method: "phone-pay" }

//       ]
//     },
//     {
//       acno: 1003, ac_type: "current", balance: 16000, transactions: [
//         { to: 1000, amount: 1000, note: "emi", method: "phone-pay" },
//         { to: 1002, amount: 500, note: "geto", method: "neft" },
//         { to: 1001, amount: 100, note: "erchrge", method: "phone-pay" }

//       ]
//     },

//   ]




class Bank {

  validateAccountNo(acno) {
    return acno in localStorage ? true : false
  }
  accountCreate() {
    let account_number = bk_acno.value;
    let email = bk_email.value
    let phone = bk_phone.value
    let password = bk_pwd.value;
    let balance = 2000
    let account = {
      account_number, email, phone, password, balance
    }
    // console.log(account);


    if (this.validateAccountNo(account_number)) {

      alert("account number already exit")

    }
    else {


      localStorage.setItem(account_number, JSON.stringify(account))
      alert("account created")

    }



  }

  authenticate(acno, password) {
    if (this.validateAccountNo(acno)) {

      let user = JSON.parse(localStorage.getItem(acno))
      if (user.password == password) {
        return 1 /////login success
      }
      else {
        return 0 /////invalid password
      }


    }
    else {
      return -1 /////invalide account no
    }
  }


  login() {
    let username = bk_username.value
    let password = bk_password.value
    let user = this.authenticate(username, password)
    console.log(user);

    if (user == 1) {

      sessionStorage.setItem("user", username)
      alert("login success")
      window.location.href = "./6a_userhome.html"
    }
    else if (user == 0) {
      alert("invalid password")
    }
    else {
      alert("invalid account number")
    }

  }



  logout() {
    if ("user" in sessionStorage) {
      sessionStorage.removeItem("user")
      window.location.href = "index.html"
    }
    else {
      alert("invalid session , you must login first")
    }
  }


  getUser() {
    let user = sessionStorage.getItem("user")
    let element = document.createElement("div")
    element.innerHTML = `<h1>welcome user ${user}</h1>`
    document.querySelector("body").append(element)

  }

  getUserDataFromLocalStorage(acno) {
    return JSON.parse(localStorage.getItem(acno))
  }

  balanceEnquiry() {
    let loggedUser = sessionStorage.getItem("user")
    let loggedUserData = this.getUserDataFromLocalStorage(loggedUser)
   
    let bal = loggedUserData.balance;
    console.log(loggedUserData.balance);
    // alert(`The balance is ${bal}`)
    return bal;

  }

  balanceEnquiryalert() {
    let loggedUser = sessionStorage.getItem("user")
    let loggedUserData = this.getUserDataFromLocalStorage(loggedUser)
   
    let bal = loggedUserData.balance;
    console.log(loggedUserData.balance);
    alert(`The balance is ${bal}`)

  }


  fundTransfer() {
    let payee_acno = sessionStorage.getItem("user")
    let to_acno = bk_toacno.value;
    let confirm_toacno = bk_ctoacno.value;
    let amount = Number(bk_amt.value);
    if (to_acno == confirm_toacno) {
      if (this.validateAccountNo(to_acno)) {
        let avl_bal = this.balanceEnquiry();
        if (amount > avl_bal) {
          alert("insufficinet balance")
        }
        else {
          let payee = this.getUserDataFromLocalStorage(payee_acno)
          let to_account = this.getUserDataFromLocalStorage(to_acno)
          let bal = avl_bal - amount
          payee.balance = bal;
          localStorage.setItem(payee_acno,JSON.stringify(payee))
          let to_cur_bal = Number(to_account.balance)
          to_cur_bal += amount
          to_account.balance = to_cur_bal;
          localStorage.setItem(to_acno,JSON.stringify(to_account))
          alert("fund transfer successful")

        }
      }
      else {
        alert("invalid account no")
      }

    }
    else {
      alert("account no missmatch")
    }

  }
}

var bank = new Bank()