import { Switch, withStyles } from '@material-ui/core';
import { getUserInfo, updateUserInfo } from 'apis';
import { EditWhiteIcon, XIcon } from 'assets/images';
import { StyledInput } from 'components/atoms';
import { DropDown, DropDownMulti } from 'components/molecules';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { interestList } from 'resources/string';
import { userState, userStatusState } from 'stores/user';
import {
  Btn,
  CategoryContainer,
  Container,
  DropdownWrapper,
  EditBtn,
  Email,
  InterestList,
  InterestTagCntnr,
  NicknameInputContainer,
  PolicyCntnr,
  ProfileContainer,
  ProfileImg,
  ProfileInput,
  PwBtn,
  Text,
  TextWrapper,
  Txt,
  TxtSmall,
} from './style';

interface IUserInfo {
  nickname: string;
  img: string;
  marpolicy: boolean;
  _id: string;
  email: string;
  gender: number;
  interest: string[];
}

function Setting(): React.ReactElement {
  // for edit btn
  const [isBtnAtv, setIsBtnAtv] = useState(true);
  const history = useHistory();

  // for user info
  const setUserData = useSetRecoilState(userState);
  const userStatusData = useRecoilValue(userStatusState);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    nickname: '',
    img: '',
    marpolicy: true,
    _id: '',
    email: '',
    gender: 0,
    interest: [],
  });

  // for img input
  const imgInput = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);
  const handleInputImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUserInfo({
        ...userInfo,
        img: URL.createObjectURL(e.target.files[0]),
      });
      setImg(e.target.files[0]);
      setIsEmpty(false);
    }
    imgInput.current && imgInput.current.value;
  };

  const handleClickDel = (e: string) => {
    setUserInfo({
      ...userInfo,
      interest: userInfo.interest.filter((it: string) => it !== e),
    });
  };

  const handleClickEdit = async () => {
    let data = null;
    if (!isEmpty) {
      data = await updateUserInfo(
        userStatusData?.token,
        img,
        userInfo.nickname,
        userInfo.interest,
        userInfo.gender,
        userInfo.marpolicy,
      );
    } else {
      data = await updateUserInfo(
        userStatusData?.token,
        undefined,
        userInfo.nickname,
        userInfo.interest,
        userInfo.gender,
        userInfo.marpolicy,
      );
    }
    if (data) {
      history.goBack();
      setUserData(userInfo);
    }
  };

  // get user info
  useEffect(() => {
    (async () => {
      if (userStatusData) {
        const userInfo = await getUserInfo(userStatusData?.token);
        setUserInfo(userInfo);
      }
    })();
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    userInfo.nickname.length === 0 || userInfo.interest.length === 0 ? setIsBtnAtv(false) : setIsBtnAtv(true);
  }, [userInfo]);

  return (
    <div>
      <Container>
        <ProfileContainer>
          <ProfileImg url={userInfo.img} />
          <label htmlFor="file">
            <EditBtn src={EditWhiteIcon} />
          </label>
          <ProfileInput
            type="file"
            id="file"
            accept="image/jpeg, image/jpg, image/png"
            ref={imgInput}
            onChange={handleInputImg}
          />
        </ProfileContainer>
        <Txt>?????????</Txt>
        <Email>{userInfo.email}</Email>
        <Txt>?????????</Txt>
        <NicknameInputContainer>
          <StyledInput
            width="844px"
            height="60px"
            placeHolder={userInfo.nickname}
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                nickname: String(e),
              })
            }
            isConditionMet={userInfo.nickname !== ''}
            errorMsg="???????????? ??????????????????"
          />
        </NicknameInputContainer>
        <Txt>????????????</Txt>
        <CategoryContainer>
          <DropDownMulti
            state={userInfo.interest}
            setState={(e) => {
              !userInfo.interest.includes(String(e)) &&
                userInfo.interest.length < 5 &&
                setUserInfo({
                  ...userInfo,
                  interest: userInfo.interest.concat([String(e)]),
                });
            }}
            defaultMsg="??????????????? ????????? ????????? (?????? 5???)"
            itemList={interestList}
          />
        </CategoryContainer>
        <InterestList>
          {userInfo.interest.map((item: string, idx: number) => {
            return <InterestTag text={item} setList={handleClickDel} key={idx} />;
          })}
        </InterestList>
        <Txt>??????</Txt>
        <DropdownWrapper>
          <DropDown
            state={userInfo.gender === 0 ? '??????' : userInfo.gender === 1 ? '??????' : '????????????'}
            setState={(e) =>
              setUserInfo({
                ...userInfo,
                gender: e === '??????' ? 0 : e === '??????' ? 1 : 2,
              })
            }
            defaultMsg="?????? ??????"
            itemList={['??????', '??????', '????????????']}
            page="joinform"
            isSetting={true}
          />
        </DropdownWrapper>
        <Txt>???????????? ??????</Txt>
        <PwBtn onClick={() => history.push('/setting/password/set')}>???????????? ????????????</PwBtn>
        <PolicyCntnr>
          <TextWrapper>
            <Text>????????? ?????? ??????</Text>
            <TxtSmall>???????????? ???????????? ?????????, ?????????, ??????????????? ?????? ????????? ?????????????????????.</TxtSmall>
          </TextWrapper>
          <IOSSwitch
            checked={userInfo.marpolicy}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInfo({
                ...userInfo,
                marpolicy: e.target.checked,
              })
            }
            name="checkedB"
          />
        </PolicyCntnr>
        <Btn
          isActive={isBtnAtv}
          onClick={
            isBtnAtv
              ? handleClickEdit
              : () => {
                  console.log('');
                }
          }
        >
          ????????????
        </Btn>
      </Container>
    </div>
  );
}

export default withRouter(Setting);

const InterestTag = ({ setList, text }: { setList: (e: string) => void; text: string }) => {
  return (
    <InterestTagCntnr>
      <div>{text}</div>
      <img id={text} src={XIcon} onClick={(e: any) => setList(e.target.id)} />
    </InterestTagCntnr>
  );
};

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    'padding': 1,
    '&$checked': {
      'transform': 'translateX(16px)',
      'color': theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#3d3d3d',
        opacity: 1,
        border: '#dfdfdf',
      },
    },
    '&$focusVisible $thumb': {
      color: '#3d3d3d',
      border: '6px solid #dfdfdf',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }: any) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
