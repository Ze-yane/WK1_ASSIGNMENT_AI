// Course data stored in JS array
let courses = [
    {
        id: 1,
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming.",
        lessons: [
            "What is JavaScript?",
            "Variables and Data Types",
            "Functions and Loops",
            "DOM Manipulation"
        ],
        completedLessons: new Set(), // Track completed lessons by index
        courseCompleted: false
    },
    {
        id: 2,
        title: "HTML & CSS Fundamentals",
        description: "Build responsive web pages with HTML and CSS.",
        lessons: [
            "HTML Structure",
            "CSS Selectors",
            "Flexbox and Grid",
            "Responsive Design"
        ],
        completedLessons: new Set(),
        courseCompleted: false
    },
    {
        id: 3,
        title: "React Basics",
        description: "Get started with React components and state.",
        lessons: [
            "Setting up React",
            "JSX Syntax",
            "Components and Props",
            "State and Hooks"
        ],
        completedLessons: new Set(),
        courseCompleted: false
    }
];

let currentCourseId = null;

// Render home page
function renderHome() {
    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = '';
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-card ${course.courseCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <button class="view-btn" onclick="showCourseDetail(${course.id})">View Course</button>
        `;
        coursesList.appendChild(card);
    });
}

// Show course detail
function showCourseDetail(id) {
    currentCourseId = id;
    const course = courses.find(c => c.id === id);
    if (!course) return;

    document.getElementById('home').style.display = 'none';
    document.getElementById('course-detail').style.display = 'block';

    document.getElementById('course-title-detail').textContent = course.title;
    renderLessons(course);
    renderProgress(course);
    updateCompleteButton(course);
}

// Render lessons with checkboxes
function renderLessons(course) {
    const lessonsList = document.getElementById('lessons-list');
    lessonsList.innerHTML = '';
    course.lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        li.className = 'lesson-item';
        li.innerHTML = `
            <input type="checkbox" class="lesson-checkbox" ${course.completedLessons.has(index) ? 'checked' : ''} onchange="toggleLesson(${course.id}, ${index})">
            <span>${lesson}</span>
        `;
        lessonsList.appendChild(li);
    });
}

// Toggle lesson completion
function toggleLesson(courseId, lessonIndex) {
    const course = courses.find(c => c.id === courseId);
    if (course.completedLessons.has(lessonIndex)) {
        course.completedLessons.delete(lessonIndex);
    } else {
        course.completedLessons.add(lessonIndex);
    }
    renderProgress(course);
    // Auto-complete course if all lessons done
    if (course.completedLessons.size === course.lessons.length && !course.courseCompleted) {
        course.courseCompleted = true;
        updateCompleteButton(course);
    }
}

// Render progress
function renderProgress(course) {
    const total = course.lessons.length;
    const completed = course.completedLessons.size;
    const percentage = (completed / total) * 100;
    document.getElementById('progress-fill').style.width = percentage + '%';
    document.getElementById('progress-text').textContent = `${completed}/${total} lessons completed (${Math.round(percentage)}%)`;
}

// Update complete button
function updateCompleteButton(course) {
    const btn = document.getElementById('complete-btn');
    if (course.courseCompleted) {
        btn.textContent = 'Course Completed!';
        btn.classList.add('completed');
        btn.disabled = true;
    } else {
        btn.textContent = 'Mark Course as Completed';
        btn.classList.remove('completed');
        btn.disabled = false;
    }
}

// Mark course as completed (manual override)
function markCourseComplete() {
    const course = courses.find(c => c.id === currentCourseId);
    if (course && !course.courseCompleted) {
        course.courseCompleted = true;
        // Optionally complete all lessons
        for (let i = 0; i < course.lessons.length; i++) {
            course.completedLessons.add(i);
        }
        renderLessons(course);
        renderProgress(course);
        updateCompleteButton(course);
    }
}

// Show home
function showHome() {
    document.getElementById('home').style.display = 'block';
    document.getElementById('course-detail').style.display = 'none';
    renderHome();
}

// Initial render
renderHome();