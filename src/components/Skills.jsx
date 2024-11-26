import { useEffect, useState } from 'react';
import axios from 'axios';

export const Skills = () => {
  const [languageList, setLanguageList] = useState([]);
  console.log(languageList);

  // 空配列のため、マウント(初回レンダリング時)のみ実行
  // useEffectの第1引数は関数自体を渡す
  // axiosはコールバックで記載することで、処理の成功失敗によって処理を変えることができる
  // responseを引数として受け取れるのは、axiosとPromiseの仕組み。コールバック関数が引数を受け取れるようなものではない。
  useEffect(() => {
    axios.get('https://api.github.com/users/tsubasahirakida/repos')
      .then((response) => {
        // map関数にコールバック関数を渡して、配列作成
        const languageList = response.data.map(res => res.language);
        const countedLanguageList = generateLanguageCountObj(languageList);
        setLanguageList(countedLanguageList);
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
