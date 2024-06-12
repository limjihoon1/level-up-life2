import { styled, createGlobalStyle  } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import ai1 from '../img/ai1.gif'
import PostList from './PostList'
import { useEffect, useState } from 'react'
import { AnimatePresence,motion } from 'framer-motion'
import Write from './Write'

const Communication= ()=>{
    
    const navigate = useNavigate()
    const [visible, setVisible]= useState(false)

    const goWrite= ()=>{
      navigate('/write')
    }
    
    return (
  
      <Container>
  
        <div className='header'>
          <div>
            <p>AI봇 정찰중..</p>
            <br/>
            <p>악성 글 차단중...</p>
            <p>악성 유저 차단중....</p>
          </div>
  
          <div>
            <img src={ai1} alt='aiImg'></img>
          </div>
        </div>
  
        <div className='floating' onClick={()=>setVisible(true)}>
          <div>
            <p>+</p>
          </div>
        </div>

        <PostList></PostList>

        <AnimatePresence>
          {
            visible && (
              <div style={modalStyle}>

                {/* 배경 */}
                <motion.div
                style={modalBack}
                initial={{opacity:0}} 
                animate={{opacity:0.6}}
                onClick={()=>setVisible(false)}
                exit={{scale:0, y:'100vh'}}
                />

                {/* 다이얼로그 */}
                <motion.div
                style={boxStyle}
                inherit={{scale:0, y:'-100vh'}}
                animate={{scale:1, y:0}}
                exit={{scale:0, y:'100vh'}}
                >
                  <Write setVisible={setVisible} />
                </motion.div>
              </div>
            )
          }
        </AnimatePresence>

        
  
      </Container>
    )  
}

export default Communication

const modalBack= {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  width:'100%',
  height:'100%', 
  position:'absolute',
  zIndex: 1}

const boxStyle= {
  padding:10, 
  position: 'relative',
  zIndex: 2}

const modalStyle= {
  position:'fixed', 
  top:0, 
  left:0, 
  right:0, 
  bottom:0, 
  display:'flex', 
  justifyContent:'center', 
  alignItems:'center'}

const Container= styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(237,226,197);
  padding: 1rem 0;
  text-align: center;

  .header{
    width: 90%;
    height: 14%;
    margin: 0 auto;
    background-color: rgb(231,217,169);
    border: 3px solid rgb(142,103,0);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 2px 5px gray;
    overflow: hidden;

    div{
      padding: 0 1rem;
      width: 50%;

      p{
        color: rgb(244,98,76);
        font-size: 14px;
      }
      
      img{
        width: 100%;
      }
    }
  }

  .floating{
    width: 15%;
    height: 6%;
    border: 3px solid rgb(142,103,0);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(237,233,233);
    box-shadow: 1px 2px 5px gray;
    position: fixed;
    bottom: 20px;  
    right: 20px;  
    cursor: pointer;


    p{
      font-size: 4rem;
      color: rgb(142,103,0);
    }
  }

`

