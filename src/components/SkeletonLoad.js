import React from "react"
import Skeleton from "react-loading-skeleton"


const SkeletonLoad = () => {
    return (
        <section>
            <h2>
                <Skeleton duration = {1} height = {30} width = {300} />
            </h2>
            <ul>
                {Array(8)
                .fill()
                .map((item, index)=>{
                    <li key = {index}>
                        <Skeleton height = {40} width = {500} />
                        <Skeleton height = {30} width = {`80%`} />
                        <Skeleton height = {40} width = {`60%`} />
                        <Skeleton height = {30} width = {`10%`} />
                    </li>;
                })}
            </ul>
        </section>
    );
};
export default SkeletonLoad;