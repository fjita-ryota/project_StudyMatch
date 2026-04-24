type Study = {
  title: string
  time: number
}

const titleInput = document.getElementById("title") as HTMLInputElement
const timeInput = document.getElementById("time") as HTMLInputElement
const addBtn = document.getElementById("addBtn") as HTMLButtonElement
const list = document.getElementById("list") as HTMLUListElement

const totalTime = document.getElementById("totalTime") as HTMLElement
const progressText = document.getElementById("progressText") as HTMLElement
const progressBar = document.getElementById("progressBar") as HTMLDivElement

let studies: Study[] = []
const goalTime = 5

const saveData = () => {
  localStorage.setItem("studies", JSON.stringify(studies))
}

const loadData = () => {
  const data = localStorage.getItem("studies")
  if (data) {
    studies = JSON.parse(data)
  }
  render()
}

const updateSummary = () => {
  const total = studies.reduce((sum, study) => sum + study.time, 0)
  const progress = Math.min(Math.round((total / goalTime) * 100), 100)

  totalTime.textContent = `${total}時間`
  progressText.textContent = `${progress}%`
  progressBar.style.width = `${progress}%`
}

const render = () => {
  list.innerHTML = ""

  if (studies.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "まだ学習記録がありません。今日の学習を追加してみましょう。"
    emptyMessage.className = "empty-message"
    list.appendChild(emptyMessage)
    updateSummary()
    return
  }

  studies.forEach((study, index) => {
    const li = document.createElement("li")

    const text = document.createElement("span")
    text.textContent = `${study.title} - ${study.time}時間`

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "削除"
    deleteBtn.onclick = () => {
      studies.splice(index, 1)
      saveData()
      render()
    }

    li.appendChild(text)
    li.appendChild(deleteBtn)
    list.appendChild(li)
  })

  updateSummary()
}

addBtn.onclick = () => {
  const title = titleInput.value.trim()
  const time = Number(timeInput.value)

  if (!title || time <= 0) {
    alert("学習内容と学習時間を入力してください")
    return
  }

  studies.push({ title, time })
  saveData()
  render()

  titleInput.value = ""
  timeInput.value = ""
}

loadData()