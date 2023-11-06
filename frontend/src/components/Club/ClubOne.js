import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ClubContext from "../../Store/Club-context";
import AuthContext from "../../Store/Auth-context";
import Club from "./Club";

const ClubOne = props => {
    let navigate = useNavigate();

    const [club, setClub] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const authCtx = useContext(AuthContext);
    const clubCtx = useContext(ClubContext);

    let isLogin = authCtx.isLoggedIn;
    const id = String(props.item);

    const deleteHandler = id => {
        clubCtx.deleteClub(authCtx.token, id);
        alert("삭제되었습니다.");
        navigate("/page/1");
    }

    const getContext = useCallback(() => {
        setIsLoading(false);
        isLogin
            ? clubCtx.getClub(id, authCtx.token)
            : clubCtx.getClub(id);
    }, [isLogin]);

    useEffect(() => {
        getContext();
    }, [getContext]);

    useEffect(() => {
        if (clubCtx.isSuccess) {
            setClub(clubCtx.club);
            setIsLoading(true);
        }
    }, [clubCtx,club]);

    let content = <p>Loading</p>

    if (isLoading && club) {
        content = <Club item={club} onDelete={deleteHandler} />
    }

    return <div>{content}</div>
}

export default ClubOne;
