import { styled } from 'styled-components'
import ai2 from '../img/ai2.gif'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const Write= (props)=>{
 
    const imgUrl= 'http://myhero.dothome.co.kr/levelUpLife/board/boardImgs/'
    const postD= props.postD
    //postD? alert('포스트d와써요'+postD.imgUrl) : alert('포스트d안와써요')

    const fileInputRef= useRef(null)
    const [imgSrc, setImgSrc] = useState(()=>{
        return props.edit == 'edit' ? (props.postD && props.postD.imgUrl ? (imgUrl + postD.imgUrl) : null) : null
    })
    const [file, setFile] = useState(null)
    const [msg, setMsg] = useState(props.postD? props.postD.content :'')

    const [update, setUpdate]= useState(false)
    const aaa=''
  
    const sendWrite= ()=>{
            //javascriptInterface로 등록할 때 지정한 별칭("Droid")객체가 웹뷰의 window 최상위객체의 멤버로 등록됨
            window.Droid.loadWrite(msg)
    }

    const user= useSelector(state=> state.setUser.user)
    // alert(user.uid)

    const addWrite= (event)=>{
        event.preventDefault()

        if(msg){
            sendWrite(msg)

            props.setVisible(false)
            console.log('게시물을 등록했어요')
    
            const url = "http://myhero.dothome.co.kr/levelUpLife/board/boardInsert.php"
            const data = new FormData()
    
            if (file) data.append("img", file)
            data.append("uid", user.uid)
            data.append("nickname", user.nickname)
            data.append("level", user.level)
            data.append("hero", user.hero)
            data.append("content", msg)
    
            fetch(url, {
                method: "POST",
                body: data
            }).then(res => res.text())
            .then(text => {
                alert(text)
                props.setLoad(true)}
            )
            .catch(e => alert(e))
        }else alert('내용을 입력해주세요')
         
        // props.setLoad(true)

        //window.location.reload();
    }

    // window.addWrite= (result)=>{
    //     sendWrite()
    //     if(msg){
    //         props.setVisible(false)
    //         console.log('게시물을 등록했어요')
    
    //         const url = "http://myhero.dothome.co.kr/levelUpLife/board/boardInsert.php"
    //         const data = new FormData()
    
    //         if (file) data.append("img", file)
    //         data.append("uid", user.uid)
    //         data.append("nickname", user.nickname)
    //         data.append("level", user.level)
    //         data.append("hero", user.hero)
    //         data.append("content", msg)
    
    //         fetch(url, {
    //             method: "POST",
    //             body: data
    //         }).then(res => res.text())
    //         .then(text => {
    //             alert(text)
    //             props.setLoad(true)}
    //         )
    //         .catch(e => alert(e))
    //     }else alert('등록할 수 없는 내용이 있습니다.')
         
    //     // props.setLoad(true)
    //     //window.location.reload();
    // }

    const EditPost=(event)=>{
        event.preventDefault()
        if(msg){
        props.setVisible(false)
        console.log(file)
        console.log('게시물수정')

        const url = "http://myhero.dothome.co.kr/levelUpLife/board/boardEditPost.php"
        const data = new FormData()

        if (file) data.append("img", file)
        data.append("uid", user.uid)
        data.append("content", msg)
        data.append("no",postD.no)

        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.text())
        .then(text => {
            alert(text)
            props.setContentD(msg)
            props.setimgD(imgSrc)
            setUpdate(true)
            console.log(msg)
        })
        .catch(e => alert(e.message))
    }else alert('내용을 입력해주세요')
        //props.setLoad(true)
        //window.location.reload();
    }


    const fileClick= ()=>{
        fileInputRef.current.click()
    }

    const selectFile= (event)=>{
        const selectedFile = event.target.files[0]
        setFile(selectedFile)
        
    }


    useEffect(()=>{
        if(file){
            //alert('이펙트실행')
            const reader = new FileReader()
            reader.onloadend= ()=>{
            //alert('리더실행')
            console.log("File reader result:", reader.result); // FileReader 결과 확인
             setImgSrc(reader.result)
             }
        reader.readAsDataURL(file)
        }


        if(props.contentD){
            setMsg(props.contentD)
        }

        if(props.imgD){
            setImgSrc(props.imgD)
        }
        setUpdate(false)

    },[file,update])

    return (
        <Container>
            <img src={ai2} alt='aiImg'></img>
            <h5>AI 모니터링 봇 사용중</h5>
            <h6>원활한 커뮤니티 활성화를 위해 이미지 및 텍스트를 검증하고 있습니다.<br/>비방, 음락, 악성 등 커뮤니티에 부합하지 않는 내용은 삭제됩니다. </h6>

            <form onSubmit={props.edit == 'edit' ? EditPost : addWrite}>
                <textarea placeholder='내용을 입력해주세요' onChange={(e) => setMsg(e.target.value)} value={props.edit == 'edit' ? msg :null}></textarea>
                <div className='addImg' onClick={fileClick}>
                    {imgSrc ? ( 
                        <img
                        src={imgSrc}
                        alt='SelectedImg'
                        style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:5}}/>
                    ): (
                        <h4>+</h4>
                     )}

                    
                    <input type='file' ref={fileInputRef} onChange={selectFile} style={{display:'none'}} accept='.jpeg,.png'></input>
                </div>
                <p>이미지 추가</p>
                <button type='submit' > { props.edit == 'edit' ? '수정' : '등록' } </button>
            </form>
        </Container>
    )
}

export default Write

const Container= styled.div`
    border: 2px solid rgb(142,103,0);
    border-radius: 6px;
    padding: 16px;
    background-color: rgb(245,245,245);

    img{
        width: 50%;
        margin: .5rem auto;
        display: block;
    }

    h5{
        color: red;
        text-align: left;
    }

    h6{
        color: rgb(142,103,0);
        margin: .2rem 0 1rem 0;
        font-size: 10px;
        text-align: left;
    }

    form{
        display: flex;
        flex-direction: column;
        width: 100%;

        textarea{
            min-height: 80px;
            border: 0;
            border-radius: 6px;
            background-color: rgb(237, 233, 233);
            color: rgb(228,168,8);
            padding: 1rem;
            box-shadow: 0px 1px 3px gray;
            resize: none;
            font-weight: 500;
            font-size: 12px;
            color: rgb(142,103,0);

            &::placeholder{
                /* color: rgb(228,168,8); */
                font-weight: 700;
            }
        }

        div{
            width: 60px;
            height: 60px;
            margin: 1rem auto .2rem auto;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(237,233,233);
            color: rgb(201,159,11);
            box-shadow: 1px 2px 5px gray;
            font-size: 2rem;
            cursor: pointer;
        }


        p{
            margin: 0.2rem auto;
            font-size: 12px;
            color: rgb(142,103,0);
        }

        button{
            width: 50%;
            margin: 1rem auto;
            padding: .5rem;
            font-size: 1rem;
            border: 2px solid rgb(142,103,0);
            box-shadow: 1px 2px 5px gray;
            font-weight: 600;
            color: rgb(142,103,0);
            border-radius: 6px;
            cursor: pointer;
        }
    }
    

`



