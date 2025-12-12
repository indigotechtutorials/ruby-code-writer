let runCodeBtn = document.querySelector(".run-code")
let codeEditor = document.querySelector(".text-edit")
let codeResults = document.querySelector(".code-results")
let errorMessage = document.querySelector(".error-message")
runCodeBtn.addEventListener("click", async(e) => {
  let codeContent = codeEditor.value
  let url = '/code_runner'
  let request_body = JSON.stringify({
    code: codeContent,
  })
  let response = await fetch(url, {
    body: request_body,
    method: "POST",
  })
  let json = await response.json()
  if (json.errors) {
    codeResults.innerHTML = ""
    errorMessage.innerHTML = json.errors
  } else {
    errorMessage.innerHTML = ""
    codeResults.innerHTML = json.results
  }
})