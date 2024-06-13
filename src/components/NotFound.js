import React from 'react';
import notfound from '../images/404.png';

const NotFound = () => {
    return (
        <div>
            <img
                className="404"
                src={notfound}
                alt="404"
                style={{ width: '85%', height: '10%', marginBottom: "100px"}} // 원하는 크기로 조절
            />
        </div>
    );
};
  
export default NotFound;