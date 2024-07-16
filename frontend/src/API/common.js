export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('http://localhost:8000/import_accounts/', {
    method: 'POST',
    body: formData
  });
  const data = await response.json();
  return data;
}
export const getAccounts = async () => {
    const response = await fetch('http://localhost:8000/list_accounts/');
    const data = await response.json();
    
    return data.accounts;
}
export const getAccount = async (id) => {
    const formdata = new FormData();

    const requestOptions = {
    method: "GET",
    
    redirect: "follow"
    };

    const response=await fetch(`http://localhost:8000/get_account/${id}`, requestOptions)

    const data = await response.json();
    console.log(data);
    return data;
}
export const transfer = async (from,to,amount) => {
    const formdata = new FormData();
    formdata.append("from_account", from);
    formdata.append("to_account", to);
    formdata.append("amount", amount);

    const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
    };

    const response=await fetch("http://localhost:8000/transfer_funds/", requestOptions)

    const data = await response.json();
    console.log(data);
    return data;
}