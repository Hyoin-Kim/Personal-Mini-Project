import { MoreClickedIcon } from 'assets/images';
import React, { useEffect, useState } from 'react';
import { interestList } from '../../../resources/string';
import { Button } from '../../atoms';
import { InterestTagButton, TagListWrapper, TagWrapper } from './style';

interface IProps {
  modalInterestHandler: (interest: string) => void;
  selectedInterest: string[];
  setSelectedInterest: (value: string[]) => void;
}

type selectedStyle = {
  backgroundColor: string;
  color: string;
};

type selectedStyleLists = {
  [key: string]: selectedStyle;
};

const selectedInterestStyle: selectedStyleLists = {
  '건강 및 피트니스': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '게임': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '교육': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '그래픽 및 디자인': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '금융': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  'K-pop': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '뉴스, 신문': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '데이트': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '날씨': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '네비게이션': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '출판,도서': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '뷰티': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '라이프 스타일': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '만화': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '부동산 / 홈 인테리어': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '사진 및 비디오': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '쇼핑': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '비즈니스': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '생산성': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '소셜 네트워킹': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '스포츠': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '어린이': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  'AR앱': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '여행': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '유틸리티': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '음식 및 음료': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '음악': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '의료': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
  '기타': { backgroundColor: '#6f6f6f', color: '#FFFFFF' },
};

function ChallengeWriteInterest({ modalInterestHandler, selectedInterest, setSelectedInterest }: IProps) {
  const [isOpenTag, setIsOpenTag] = useState(false);
  const [isClickTag, setIsClickTag] = useState(false);

  const setInterestButton = (id: any, interest: string) => {
    return (
      <InterestTagButton
        key={id}
        onClick={() => {
          modalInterestHandler(interest);
          setIsClickTag(!isClickTag);
        }}
        style={
          selectedInterestStyle[interest] && selectedInterest.indexOf(interest) > -1
            ? selectedInterestStyle[interest]
            : {}
        }
      >
        {interest}
      </InterestTagButton>
    );
  };

  useEffect(() => {
    setSelectedInterest(selectedInterest);
  }, [selectedInterest]);

  return (
    <TagWrapper>
      해시태그
      <div>
        {interestList.map((interest, id) => {
          if (id < 6) {
            return setInterestButton(id, interest);
          }
        })}

        <Button
          onClick={() => {
            setIsOpenTag(!isOpenTag);
          }}
        >
          <img src={MoreClickedIcon} alt=""></img>
        </Button>
        <TagListWrapper>
          {isOpenTag === true ? (
            <button>
              {isOpenTag === true ? (
                interestList.map((interest, id) => {
                  return setInterestButton(id, interest);
                })
              ) : (
                <div></div>
              )}
            </button>
          ) : null}
        </TagListWrapper>
      </div>
    </TagWrapper>
  );
}

export default ChallengeWriteInterest;
