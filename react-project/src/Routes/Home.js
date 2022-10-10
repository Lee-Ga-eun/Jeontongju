import React from "react";
import "../Routes/Home.module.css";

function Home(){
    return (
        <div className="home">
            <header id="header">
                <img id="title" src="img/title.png" alt="" />
            </header>
            <nav className="nav">
                <img id="banner" src="img/banner.png" alt="" />
            </nav>
            <article className="menu">
                <section>
                    <table>
                        <tr>
                            <td>
                            <a href="/drinks/recommendation">
                                <img
                                id="recommendation"
                                src="img/recommendation.png"
                                alt=""
                                />
                            </a>
                            </td>
                            <td>
                                <a href="/stores">
                                    <img id="stores" src="img/stores.png" alt="" />
                                </a>
                            </td>
                        </tr>
                    </table>
                </section>
            </article>
            <article className="list">
                <header id="listheader">
                    <img id="drink"src="img/list.png" alt="" />
                </header>
                <div id="driklist">
                    <img src="img/drinklist.png" alt="" />
                </div>
            </article>
        </div>
    );
}
export default Home;
