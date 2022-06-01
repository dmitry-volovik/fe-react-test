import styled from 'styled-components';

const DialogBodyWrapper = styled.div`
    .content{
        width: 100%;
        margin-top: 5px;
    }

    .formLoaderBackground {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.1);
  }
  .buttonProgress {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -12px;
    margin-left: -18px;
  }
`

export default DialogBodyWrapper;