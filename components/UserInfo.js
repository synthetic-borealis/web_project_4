class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._nameTextElement = document.querySelector(userNameSelector);
    this._jobTextElement = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameTextElement.textContent,
      job: this._jobTextElement.textContent
    };

    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._nameTextElement.textContent = name;
    this._jobTextElement.textContent = job;
  }
}

export default UserInfo;
