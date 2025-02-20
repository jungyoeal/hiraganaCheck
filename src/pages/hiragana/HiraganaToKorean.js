import { useState, useEffect, useRef } from 'react';
import styles from '@/styles/HiraganaToKorean.module.css';

export default function HiraganaToKorean() {
    const hiraganaDict = {
        'あ': '아', 'い': '이', 'う': '우', 'え': '에', 'お': '오',
        'か': '카', 'き': '키', 'く': '쿠', 'け': '케', 'こ': '코',
        'さ': '사', 'し': '시', 'す': '스', 'せ': '세', 'そ': '소',
        'た': '타', 'ち': '치', 'つ': '츠', 'て': '테', 'と': '토',
        'な': '나', 'に': '니', 'ぬ': '누', 'ね': '네', 'の': '노',
        'は': '하', 'ひ': '히', 'ふ': '후', 'へ': '헤', 'ほ': '호',
        'ま': '마', 'み': '미', 'む': '무', 'め': '메', 'も': '모',
        'や': '야', 'ゆ': '유', 'よ': '요',
        'ら': '라', 'り': '리', 'る': '루', 'れ': '레', 'ろ': '로',
        'わ': '와', 'を': '오', 'ん': '응'
    };

    const [currentHiragana, setCurrentHiragana] = useState('');
    const [currentRound, setCurrentRound] = useState(1);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [remainingWords, setRemainingWords] = useState([]);
    const [incorrectWords, setIncorrectWords] = useState(new Set());
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState({ text: '', isCorrect: null });
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const inputRef = useRef(null);

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startNewRound = () => {
        if (incorrectWords.size === 0) {
            setCurrentHiragana('모든 학습 완료!');
            setShowMessage(true);
            setMessage('축하합니다! 모든 히라가나를 학습했습니다!');
            return;
        }

        setCurrentRound(prev => prev + 1);
        const newRemainingWords = shuffleArray([...incorrectWords]);
        setRemainingWords(newRemainingWords);
        setIncorrectWords(new Set());
        setAnsweredCount(0);
        setCorrectCount(0);
        setMessage(`틀린 ${newRemainingWords.length}개의 단어를 다시 학습합니다.`);
        setShowMessage(true);
        showNextHiragana(newRemainingWords);
    };

    const showNextHiragana = (words = remainingWords) => {
        if (words.length === 0) {
            if (incorrectWords.size > 0) {
                setTimeout(() => {
                    startNewRound();
                }, 1500);
            } else {
                startNewRound();
            }
            return;
        }

        const newWords = [...words];
        const nextHiragana = newWords.pop();
        setCurrentHiragana(nextHiragana);
        setRemainingWords(newWords);
        setInputValue('');
        setResult({ text: '', isCorrect: null });
        setIsProcessing(false);
        setShowMessage(false);
        inputRef.current?.focus();
    };

    const checkAnswer = () => {
        if (isProcessing) return;
        setIsProcessing(true);

        const userAnswer = inputValue.trim();
        const correctAnswer = hiraganaDict[currentHiragana];

        setAnsweredCount(prev => prev + 1);

        if (userAnswer === correctAnswer) {
            setResult({ text: '정답입니다!', isCorrect: true });
            setCorrectCount(prev => prev + 1);
        } else {
            setResult({ text: `틀렸습니다. 정답은 '${correctAnswer}'입니다.`, isCorrect: false });
            setIncorrectWords(prev => new Set([...prev, currentHiragana]));
        }

        setTimeout(() => {
            showNextHiragana();
        }, 700);
    };

    const handleKeyUp = (event) => {
        if (event.key === 'Enter' && !isProcessing) {
            checkAnswer();
        }
    };

    useEffect(() => {
        setRemainingWords(shuffleArray(Object.keys(hiraganaDict)));
    }, []);

    useEffect(() => {
        if (remainingWords.length > 0 && !currentHiragana) {
            showNextHiragana();
        }
    }, [remainingWords]);

    const totalWords = remainingWords.length + answeredCount;
    const progress = (answeredCount / totalWords) * 100;
    const accuracy = (correctCount / answeredCount) * 100 || 100;

    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <h1 className={styles.title}>히라가나 연습</h1>

                <div className={styles.roundInfo}>
                    {currentRound === 1 ? '전체 단어 학습' : `오답 학습 - ${currentRound}라운드`}
                </div>

                <div className={styles.stats}>
                    <div className={styles.statItem}>진행: {answeredCount}/{totalWords}</div>
                    <div className={styles.statItem}>정답률: {accuracy.toFixed(1)}%</div>
                </div>

                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className={`${styles.message} ${showMessage ? styles.visible : ''}`}>
                    {message}
                </div>

                <div className={styles.hiragana}>
                    {currentHiragana}
                </div>

                <div className={styles.inputArea}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={handleKeyUp}
                        placeholder="한글 발음 입력"
                        className={styles.input}
                        autoComplete="off"
                    />
                </div>

                <div className={`${styles.result} ${
                    result.isCorrect === true ? styles.correct :
                        result.isCorrect === false ? styles.incorrect : ''
                }`}>
                    {result.text}
                </div>

                <p className={styles.hint}>
                    발음을 입력하고 Enter를 누르세요
                </p>
            </div>
        </div>
    );
}