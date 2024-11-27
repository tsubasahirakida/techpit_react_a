import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { skillReducer, initialState, actionTypes } from '../reducers/skillReducer';
import { requestStates } from '../constants';

export const Skills = () => {
  const [state, dispatch] = useReducer(skillReducer, initialState);

  // 空配列のため、マウント(初回レンダリング時)のみ実行
  // useEffectの第1引数は関数自体を渡す
  // axiosはコールバックで記載することで、処理の成功失敗によって処理を変えることができる
  // responseを引数として受け取れるのは、axiosとPromiseの仕組み。コールバック関数が引数を受け取れるようなものではない。
  useEffect(() => {
    dispatch({ type: actionTypes.fetch });
    axios.get('https://api.github.com/users/tsubasahirakida/repos')
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

  const convertCountToPercentage = (count) => {
    if (count > 10) { return 100; }
    return count * 10;
  };

  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            state.requestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            state.requestState === requestStates.success && (
              state.languageList.map((item, index) => (
                <div className="skill-item" key={index}>
                  <p className="description"><strong>{item.language}</strong></p>
                  <div style={{ width: 100, height: 100 }}>
                    <CircularProgressbar value={convertCountToPercentage(item.count)} text={`${convertCountToPercentage(item.count)}%`}/>
                  </div>
                </div>
              ))
            )
          }
          {
            state.requestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};
