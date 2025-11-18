'use client';

import { useEffect, useRef } from 'react';
import type { JSAnimation } from 'animejs';
import { animate } from 'animejs';

const BLOB_COUNT = 5;
const SPARK_COUNT = 18;

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default function AnimatedBackground() {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sparksRef = useRef<(HTMLSpanElement | null)[]>([]);
  const blobAnimationsRef = useRef<JSAnimation[]>([]);
  const sparkAnimationsRef = useRef<JSAnimation[]>([]);

  useEffect(() => {
    blobAnimationsRef.current = blobsRef.current
      .filter((blob): blob is HTMLDivElement => Boolean(blob))
      .map((blob, index) =>
        animate(blob as any, {
          translateX: [
            { value: index % 2 === 0 ? 120 : -120, duration: 8000 },
            { value: index % 2 === 0 ? -70 : 70, duration: 7000 },
          ],
          translateY: [
            { value: index % 2 === 0 ? -80 : 80, duration: 9000 },
            { value: index % 2 === 0 ? 60 : -60, duration: 9000 },
          ],
          scale: [
            { value: 1.35, duration: 6500 },
            { value: 0.85, duration: 6500 },
          ],
          rotate: [
            { value: 45, duration: 8000 },
            { value: -30, duration: 8000 },
          ],
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
          delay: index * 500,
          autoplay: true,
        })
      );

    return () => {
      blobAnimationsRef.current.forEach((anim) => anim.pause());
      blobAnimationsRef.current = [];
    };
  }, []);

  useEffect(() => {
    sparkAnimationsRef.current = sparksRef.current
      .filter((spark): spark is HTMLSpanElement => Boolean(spark))
      .map((spark, index) => {
        const translateXKeyframes = [
          { value: randomBetween(-40, 40), duration: randomBetween(3500, 6000) },
          { value: randomBetween(-15, 15), duration: randomBetween(3500, 6000) },
        ];
        const translateYKeyframes = [
          { value: randomBetween(-40, 40), duration: randomBetween(3500, 6000) },
          { value: randomBetween(-15, 15), duration: randomBetween(3500, 6000) },
        ];
        return animate(spark as any, {
          translateX: translateXKeyframes,
          translateY: translateYKeyframes,
          opacity: [{ value: 0.15 }, { value: 0.5 }],
          scale: [{ value: 1.6 }, { value: 0.6 }],
          easing: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
          delay: index * 220,
        });
      });

    return () => {
      sparkAnimationsRef.current.forEach((anim) => anim.pause());
      sparkAnimationsRef.current = [];
    };
  }, []);

  return (
    <div className="liquid-container">
      <div className="liquid-gradient" />
      {Array.from({ length: BLOB_COUNT }).map((_, idx) => (
        <div
          key={`blob-${idx}`}
          ref={(el) => {
            blobsRef.current[idx] = el;
          }}
          className={`liquid-blob blob-${idx}`}
        />
      ))}
      <div className="liquid-spark-field">
        {Array.from({ length: SPARK_COUNT }).map((_, idx) => (
          <span
            key={`spark-${idx}`}
            ref={(el) => {
              sparksRef.current[idx] = el;
            }}
            className="liquid-spark"
            style={{ animationDelay: `${idx * 0.35}s` }}
          />
        ))}
      </div>
    </div>
  );
}

