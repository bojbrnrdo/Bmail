.mail-center {
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 28px 28px 0 0;
  overflow: hidden;
  margin-right: 10px;
}

.mail-toolbar {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid #eceff3;
}

.mail-toolbar-left,
.mail-toolbar-right,
.viewer-toolbar-left,
.viewer-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toolbar-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  color: #5f6368;
  font-size: 18px;
}

.toolbar-btn:hover {
  background: #edf2fa;
}

.category-tabs {
  height: 78px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid #eceff3;
}

.category-tab {
  border: none;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  position: relative;
  text-align: left;
}

.category-tab span {
  font-size: 24px;
  color: #5f6368;
}

.category-tab strong {
  display: block;
  font-size: 16px;
  font-weight: 500;
}

.category-tab small {
  display: inline-block;
  margin-top: 4px;
  color: var(--green);
  font-size: 12px;
  font-weight: 700;
  background: #e6f4ea;
  padding: 3px 8px;
  border-radius: 999px;
}

.category-tab.active {
  color: var(--blue);
}

.category-tab.active::after {
  content: "";
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 3px;
  background: var(--blue);
  border-radius: 999px;
}

.mail-list {
  flex: 1;
  overflow-y: auto;
  background: #fff;
}

.mail-row {
  min-height: 56px;
  display: grid;
  grid-template-columns: 40px 40px 280px 1fr 110px;
  align-items: center;
  gap: 0;
  padding: 0 14px;
  border-bottom: 1px solid #eceff3;
  cursor: pointer;
}

.mail-row:hover {
  box-shadow: inset 0 -1px 0 #eceff3, 0 1px 3px rgba(60, 64, 67, 0.2);
  z-index: 1;
  position: relative;
}

.mail-row.selected {
  background: #f2f6fc;
}

.mail-row.unread .mail-from,
.mail-row.unread .mail-main-subject,
.mail-row.unread .mail-date {
  font-weight: 700;
  color: #202124;
}

.mail-select,
.mail-star {
  display: grid;
  place-items: center;
  color: #c0c4c9;
  font-size: 22px;
}

.mail-from {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  padding-right: 18px;
}

.mail-main {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  font-size: 16px;
}

.mail-main-subject {
  white-space: nowrap;
}

.mail-main-preview {
  color: #5f6368;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mail-date {
  text-align: right;
  font-size: 14px;
  color: #5f6368;
}

.mail-list-footer {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid #eceff3;
  color: #5f6368;
  font-size: 13px;
}

.viewer-panel {
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #eceff3;
}

.viewer-toolbar {
  height: 68px;
  border-bottom: 1px solid #eceff3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
}

.viewer-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 28px 18px;
}

.message-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.message-subject {
  font-size: 28px;
  font-weight: 400;
  letter-spacing: -0.2px;
}

.message-tag {
  height: 24px;
  padding: 0 10px;
  border-radius: 6px;
  background: #f1f3f4;
  color: #5f6368;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
}

.result-status-pill {
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
}

.result-status-pill.success {
  background: #e6f4ea;
  color: #188038;
}

.result-status-pill.error {
  background: #fce8e6;
  color: #d93025;
}

.message-meta-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}

.sender-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #8e24aa;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  flex-shrink: 0;
}

.sender-meta {
  flex: 1;
  min-width: 0;
}

.sender-main-line {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}

.sender-name {
  font-weight: 700;
  font-size: 15px;
}

.sender-email,
.sender-sub-line,
.message-time {
  color: #5f6368;
  font-size: 13px;
}

.message-body {
  color: #202124;
  font-size: 15px;
  line-height: 1.75;
  white-space: pre-line;
  padding-left: 56px;
  padding-bottom: 20px;
}

.message-body .fake-button {
  display: inline-block;
  margin-top: 14px;
  border-radius: 999px;
  background: var(--blue);
  color: #fff;
  text-decoration: none;
  padding: 11px 20px;
  font-weight: 700;
}

.phish-highlight {
  background: rgba(217, 48, 37, 0.16);
  color: #a50e0e;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 4px;
}

.decision-panel {
  border-top: 1px solid #eceff3;
  padding: 14px 18px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.decision-btn,
.next-btn {
  height: 42px;
  border: none;
  border-radius: 999px;
  padding: 0 18px;
  color: #fff;
  font-weight: 700;
}

.legit-btn {
  background: #188038;
}

.phish-btn {
  background: #d93025;
}

.next-btn {
  background: #1a73e8;
}

.decision-btn:disabled,
.next-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 1400px) {
  .mail-row {
    grid-template-columns: 36px 36px 220px 1fr 90px;
  }
}