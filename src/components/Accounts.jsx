import React, { useEffect, useState } from "react";

function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/accounts")
      .then(res => res.json())
      .then(data => {
        setAccounts(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
 <div></div>
  );
}

export default Accounts;