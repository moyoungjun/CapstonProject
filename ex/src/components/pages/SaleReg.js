import React, { useState } from "react";
import "../../css/saleReg.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import multer from "multer";
import { useNavigate } from "react-router";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import Linkpage from "./Linkpage";

function SaleReg() {
  const nav = useNavigate();
  const [previewImg, setPreviewImg] = useState("");
  const [saletitle, setsaletitle] = useState("");
  const [saletextarea, settextarea] = useState("");
  const [saleprice, setsaleprice] = useState("");
  const [salestate, setsalestate] = useState("");
  const [content, setContent] = useState("");
  const [a, seta] = useState("");

  const insertImg = (e) => {
    setContent(e.target.files[0]);

    let render = new FileReader();

    if (e.target.files[0]) {
      render.readAsDataURL(e.target.files[0]);
    }

    render.onloadend = () => {
      const previewImgUrl = render.result;

      if (previewImgUrl) {
        setPreviewImg(previewImgUrl);
      }
    };
  };

  const SaleReg_button = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("file", content);
    formData.append("saletitle", saletitle);
    formData.append("saletextarea", saletextarea);
    formData.append("saleprice", saleprice);
    formData.append("salestate", salestate);

    Axios.post("/Salereg", formData).then((e) => {
      const { fileName } = e.data;

      alert("글작성완료");
      nav("/sale");
    });
    // Axios.get("/Salereg",(req,res)=>{
        

    // }.then);

  };

  return (
    <div>
      <Linkpage/>

      <div className="headerSearch">
        <Search />
        <Header />
      </div>
      
      <p>{a}</p>
      <form className="HongSaleReg">
        <div className="Hong">
          <div>
            <div className="Mains">

              <div>
                <main className="HongMain">
                  <section>
                    <h2>판매정보</h2>
                   
                    <ul className="ul_sell">
                      <li className="li_sell">
                        <div className="li_title">
                          <p> 상품 등록 </p>
                        </div>

                        <div className="li_detail">
                          <ul className="ul_image">
                            <li className="li_image_upload">
                              이미지 미리보기
                              <input
                                type="file"
                                id="input_file"
                                accept="image/jpg, image/jpeg, image/png"
                                onChange={(e) => insertImg(e)}
                              />
                            </li>

                            <li className="li_preview">
                              <img src={previewImg} />
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li className="li_sell">
                        <div className="li_title">상품명</div>
                        <div className="li_detail" id="saleTitle">
                          <input
                            type="text"
                            onChange={(e) => {
                              setsaletitle(e.target.value);
                            }}
                            id="title_txt"
                            placeholder="상품명을 입력해주세요!"
                          />
                        </div>
                      </li>

                      <li className="li_sell">
                        <div className="li_title">상태</div>
                        <div className="li_detail">
                          <div className="li_status">
                            <lable for="중고상품" className="status">
                              <input
                                className="used"
                                onChange={(e) => {
                                  setsalestate(e.target.value);
                                }}
                                type="radio"
                                name="status"
                                checked
                              />
                              중고상품
                            </lable>
                            <lable for="새상품" className="status">
                              <input
                                className="new"
                                onChange={(e) => {
                                  setsalestate(e.target.value);
                                }}
                                type="radio"
                                name="status"
                              />
                              새상품
                            </lable>
                          </div>
                        </div>
                      </li>

                      <li className="li_sell">
                        <div className="li_title">가격</div>
                        <div>
                          <input
                            className="price"
                            onChange={(e) => {
                              setsaleprice(e.target.value);
                            }}
                            type="number"
                          />{" "}
                          원
                        </div>
                      </li>

                      <li className="li_sell">
                        <div className="li_title goods_info">상품 설명</div>
                        <div className="li_detail">
                          <textarea
                            onChange={(e) => {
                              settextarea(e.target.value);
                            }}
                            id="content_txt"
                            defaultValue="<판매글 양식>
                            판매자 학번:
                            연락가능한 수단:
                            판매하는 이유:
                            직거래 위치:
                            상품 상태 등 설명:
                            * 그 외 사항은 직접 연락으로 판매해주세요!"
                          />
                        </div>
                      </li>

                      <div className="saleRegButton">
                        <div></div>
                        <div id="post_submit">
                          <button className="saleBtn" type="submit" onClick={SaleReg_button}>
                            {" "}
                            등록하기{" "}
                          </button>
                          <Link to="/sale">
                            <button className="saleBtn"> 돌아가기 </button>
                          </Link>
                        </div>
                      </div>
                    </ul>
                  </section>
                </main>
              </div>

            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default SaleReg;
