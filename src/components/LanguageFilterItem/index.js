// Write your code here

const LanguageFilterItem = props => {
  const {allLanguages, onChangeLanguage} = props
  const {id, language} = allLanguages
  const changeId = () => {
    onChangeLanguage(id)
  }

  return (
    <li>
      <button type="button" onClick={changeId}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
