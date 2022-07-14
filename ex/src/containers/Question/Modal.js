import React from 'react';
import "../../css/Read.css";

const Modal = (props) => {
    const { open, close, header, commentKey } = props;
  
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              댓글수정
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}
              {commentKey}
            </main>
            <footer>
              <button className="close" onClick={close}>
                close
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    );
  };
  export default Modal;