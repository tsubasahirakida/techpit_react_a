import { useEffect } from 'react';
import axios from 'axios';

export const Skills = () => {
  // 空配列のため、マウント(初回レンダリング時)のみ実行
  // useEffectの第1引数は関数自体を渡す
  // axiosはコールバックで記載することで、処理の成功失敗によって処理を変えることができる
  // responseを引数として受け取れるのは、axiosとPromiseの仕組み。コールバック関数が引数を受け取れるようなものではない。
  useEffect(() => { axios.get('https://api.github.com/users/tsubasahirakida/repos').then((response) => console.log(response)).catch(() => console.log('失敗')) }, []);

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
