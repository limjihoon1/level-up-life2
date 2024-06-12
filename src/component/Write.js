import { styled } from 'styled-components'
import ai2 from '../img/ai2.gif'
import { useEffect, useRef, useState } from 'react'

const Write= (props)=>{

    const img = ai2 //현재 게시물 이미지 

    const fileInputRef= useRef(null)
    const [imgSrc, setImgSrc] = useState(()=>{
        return props.edit == 'edit' ? img : null
    })
    const [file, setFile] = useState(null)
    const [content,setContent] = useState('현재페이지내용')

    const addWrite= (event)=>{
        event.preventDefault()
        props.setVisible(false)

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
    },[file])

    return (
        <Container>
            <img src={ai2} alt='aiImg'></img>
            <h5>AI 검증 봇 사용중</h5>
            <h6>원활한 커뮤니티 활성화를 위해 이미지 및 텍스트를 검증하고 있습니다.<br/>비방, 음락, 악성 등 커뮤니티에 부합하지 않는 내용은 등록되지 않습니다.</h6>

            <form>
                <textarea placeholder='내용을 입력해주세요'>{props.edit == 'edit' ? content : ''}</textarea>
                <div className='addImg' onClick={fileClick}>
                    {imgSrc ? (
                        <img
                        src={imgSrc}
                        alt='SelectedImg'
                        style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:5}}
                    />
                ): (
                    <h4>+</h4>
                )}
                    <input type='file' ref={fileInputRef} onChange={selectFile} style={{display:'none'}} accept='.jpeg,.png'></input>
                </div>
                <p>이미지 추가</p>
                <button type='submit' onClick={addWrite}> { props.edit == 'edit' ? '수정' : '등록' } </button>
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
        text-align: center;
    }

    h6{
        color: rgb(142,103,0);
        margin: .2rem 0 1rem 0;
        font-size: 10px;
        text-align: center;
    }

    form{
        display: flex;
        flex-direction: column;
        width: 100%;

        textarea{
            min-height: 100px;
            border: 0;
            border-radius: 6px;
            background-color: rgb(237, 233, 233);
            color: rgb(228,168,8);
            padding: 1rem;
            box-shadow: 0px 1px 3px gray;
            resize: none;
            font-weight: 500;
            font-size: 14px;
            color: rgb(142,103,0);

            &::placeholder{
                /* color: rgb(228,168,8); */
                font-weight: 700;
            }
        }

        div{
            width: 70px;
            height: 70px;
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



