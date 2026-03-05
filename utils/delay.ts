// [강의포인트] delay는 mock 저장소에서 네트워크 지연을 흉내 내기 위한 유틸입니다.
// 실제 API 전환 전에도 로딩 상태/스켈레톤 UI를 현실적으로 검증할 수 있습니다.
export function delay<T>(value: T, ms: number): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}
