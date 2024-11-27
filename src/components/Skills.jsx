import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);

  // 空配列のため、マウント(初回レンダリング時)のみ実行
  // useEffectの第1引数は関数自体を渡す
  // axiosはコールバックで記載することで、処理の成功失敗によって処理を変えることができる
  // responseを引数として受け取れるのは、axiosとPromiseの仕組み。コールバック関数が引数を受け取れるようなものではない。
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/USER_NAME/repos')
      .then((response) => {
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        dispatch({ type: actionTypes.success, payload: { languageList: countedLanguageList } });
      })
      .catch(() => {
        dispatch({ type: actionTypes.error });
      });
  }, []);

  const generateLanguageCountObj = (allLanguageList) => {
    // nullのオブジェクトのみ弾く。
    // filter関数にコールバック関数を渡して、配列作成
    const notNullLanguageList = allLanguageList.filter(language => language != null);
    // uniqの配列作成
    const uniqueLanguageList = [...new Set(notNullLanguageList)];

    // 内部の
    return uniqueLanguageList.map(item => ({
      language: item,
      count: allLanguageList.filter(language => language === item).length
    }));
  };

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
        </div>
      </div>
    </div>
  );
};
