import { challengeOpen } from 'apis';
import { CheckOffIcon, CheckOnIcon, GreyPlusIcon } from 'assets/images';
import { FileUpload as PhotoUpload } from 'components/atoms';
import { AdminChallengeOpenForm } from 'components/molecules';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userStatusState } from 'stores/user';
import {
  CheckContainer,
  CheckExp,
  CheckImage,
  ElementLabel,
  OpenButton,
  PageLabel,
  PhotoUploadBottomDesc,
  PhotoUploadContainer,
  PhotoUploadImage,
  PhotoUploadMiddleDesc,
  SCheckBox,
  Title,
  UploadContainer,
  Wrapper,
} from './style';

function AdminChallengeOpen(): React.ReactElement {
  const history = useHistory();
  const userStatusData = useRecoilValue(userStatusState);
  const [image, setImage] = useState<File | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isConditionMet, setIsConditionMet] = useState({
    title: false,
    challengePeriod: {
      start: false,
      end: false,
    },
    applyPeriod: {
      start: false,
      end: false,
    },
    peopleNum: false,
  });
  const [challengeOpenData, setChallengeOpenData] = useState({
    title: '',
    challengePeriod: {
      start: '',
      end: '',
    },
    applyPeriod: {
      start: '',
      end: '',
    },
    peopleNum: 0,
  });
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (
      isConditionMet.title &&
      isConditionMet.challengePeriod.start &&
      isConditionMet.challengePeriod.end &&
      isConditionMet.applyPeriod.start &&
      isConditionMet.applyPeriod.end &&
      isConditionMet.peopleNum &&
      image != null &&
      isChecked
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [isConditionMet, image, isChecked]);
  const btnHandler = async () => {
    if (userStatusData) {
      const isSuccess = await challengeOpen(userStatusData.token, { ...challengeOpenData, img: image });
      isSuccess && history.goBack();
    } else {
      alert('????????? ??? ???????????????');
    }
  };

  return (
    <Wrapper>
      <PageLabel>????????? ?????????</PageLabel>
      <Title>????????? ??????</Title>
      <AdminChallengeOpenForm
        isConditionMet={isConditionMet}
        setIsConditionMet={setIsConditionMet}
        challengeOpenData={challengeOpenData}
        setChallengeOpenData={setChallengeOpenData}
      />
      <UploadContainer>
        <ElementLabel>?????? ?????????</ElementLabel>
        <PhotoUpload width={'262px'} height={'216px'} setFile={setImage} fileType={0}>
          <PhotoUploadContainer>
            <PhotoUploadImage src={GreyPlusIcon}></PhotoUploadImage>
            <PhotoUploadMiddleDesc>
              ???????????????
              <br />
              (??????)
            </PhotoUploadMiddleDesc>
            <PhotoUploadBottomDesc>(1920px X 253px)</PhotoUploadBottomDesc>
          </PhotoUploadContainer>
        </PhotoUpload>
      </UploadContainer>
      <CheckContainer>
        <SCheckBox id="checkBox" checked={isChecked} onChange={checkHandler} />
        <CheckExp htmlFor="checkBox">
          <CheckImage src={isChecked ? CheckOnIcon : CheckOffIcon} />??? ????????? ??????????????????????
        </CheckExp>
      </CheckContainer>
      <OpenButton disabled={isButtonDisabled} isButtonDisabled={isButtonDisabled} onClick={btnHandler}>
        ????????????
      </OpenButton>
    </Wrapper>
  );
}

export default AdminChallengeOpen;
